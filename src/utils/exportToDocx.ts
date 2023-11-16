import { Document, Paragraph, TextRun, HeadingLevel, Packer, ISectionOptions, SectionType, ExternalHyperlink, SymbolRun } from "docx";
import { useZustand } from "../hooks/useZustand";
import { mapProfileSections } from "../models/mapProfileSections";
import { displayPeriod } from "./dateConverters";
import { hyperize } from "./hyperize";
import { scaleRating } from "../components/primitives/EditRating";

function hyperText(text: string) {
  return hyperize(
    text,
    (i, text, url) => url
      ? new ExternalHyperlink({
        children: [
          new TextRun({
            text,
            style: "Hyperlink",
          }),
        ],
        link: url
      })
      : new TextRun(text),
    ''
  )
}

function handlePeriod({ title, subtitle, startDate, endDate, dateSettings, dateStyle }: ModelType<Period> & {
  dateSettings: {
    locales: Intl.LocalesArgument, present: string
  }
  dateStyle: 'short' | 'long'
}): Paragraph[] {
  const children: Paragraph[] = []
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: hyperText(title)
    })
  )
  if (subtitle) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: hyperText(subtitle)
      })
    )
  }
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_4,
      text: displayPeriod(
        dateSettings,
        { dateStyle },
        { startDate: startDate, endDate: endDate }
      )
    })
  )
  return children
}

export async function exportToDocx(
  dateSettings: {
    locales: Intl.LocalesArgument, present: string
  },
  localRating: [
    weak: string, beginner: string, learning: string, intermediate: string, good: string, verygood: string
  ] = [
      'weak', 'beginner', 'learning', 'intermediate', 'good', 'very good'
    ]
) {
  const state = useZustand.getState()

  const profileSections = state.getProfileSections()
  const profileMap = mapProfileSections(profileSections, (key, item): ISectionOptions => {
    const { title } = state.getHeaderProps('eras', item.id)
    const children = [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: hyperText(title)
      })
    ]
    switch (key) {
      case 'periods': {
        for (const model of item.items) {
          const value = state.periods.models[model.id]
          if (value) {
            children.push(
              ...handlePeriod({ ...value, dateSettings, dateStyle: 'short' })
            )
          }
        }
        break
      }
      case 'ratedSkills': {
        for (const model of item.items) {
          const value = state.ratedSkills.models[model.id]
          if (value) {
            children.push(
              new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: hyperText(value.skill)
              })
            )
            const [_, rating] = scaleRating(value.rating, 5)
            children.push(
              new Paragraph({ text: localRating[rating] })
            )
          }
        }
        break
      }
      case 'iconicItems': {
        for (const model of item.items) {
          const value = state.iconicItems.models[model.id]
          if (value) {
            children.push(
              new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: hyperText(value.title ?? value.icon)
              }),
              new Paragraph({
                children: hyperText(value.item)
              })
            )
          }
        }
        break
      }
    }
    return {
      properties: {
        type: SectionType.CONTINUOUS
      }, children
    }
  })
  const mainSections = state.getMainPeriods()
  const main: Paragraph[] = []
  for (const sectionKey in mainSections) {
    const section = mainSections[sectionKey]!
    const { title } = state.getHeaderProps('eras', section.id)
    main.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: hyperText(title)
      })
    )
    for (const periodModel of section.items) {
      const period = state.periods.models[periodModel.id]!
      main.push(
        ...handlePeriod({ ...period, dateSettings, dateStyle: 'long' })
      )
      if (period.introduction) {
        main.push(new Paragraph({
          children: hyperText(period.introduction)
        }))
      }
      main.push(...periodModel.features.map(feat => new Paragraph({
        bullet: {
          level: 0
        },
        children: hyperText(state.periodFeatures.models[feat]?.feature ?? '')
      })))
    }
  }

  const profileProps = state.getHeaderProps('profiles', '0')
  const header = {
    children: [
      new Paragraph({
        heading: HeadingLevel.TITLE,
        text: profileProps.title
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: profileProps.subtitle
      })
    ]
  }
  if (profileProps.introduction) {
    header.children.push(
      new Paragraph({
        children: hyperText(profileProps.introduction)
      })
    )
  }

  const doc = new Document({
    sections: [header, ...profileMap, { children: main }]
  })
  const blob = await Packer.toBlob(doc)
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = 'my-react-cv.docx'
  document.body.appendChild(a)
  a.click();
  window.URL.revokeObjectURL(url);
}
