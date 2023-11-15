import { Document, Paragraph, TextRun, HeadingLevel, Packer, ISectionOptions, SectionType } from "docx";
import { useZustand } from "../hooks/useZustand";
import { mapProfileSections } from "../components/Profile";
import { displayPeriod } from "./dateConverters";

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
      children: [new TextRun(title)]
    })
  )
  if (subtitle) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun(subtitle)]
      })
    )
  }
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_4,
      children: [new TextRun(
        displayPeriod(
          dateSettings,
          {
            dateStyle
          },
          { startDate: startDate, endDate: endDate })
      )]
    })
  )
  return children
}

export async function exportToDocx(
  dateSettings: {
    locales: Intl.LocalesArgument, present: string
  }
) {
  const state = useZustand.getState()
  const profileSections = state.getProfileSections()
  const profileMap = mapProfileSections(profileSections, (key, item): ISectionOptions => {
    const { title } = state.getHeaderProps('eras', item.id)
    const children = [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun(title)
        ]
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
        break
      }
      case 'iconicItems': {
        for (const model of item.items) {
          const value = state.iconicItems.models[model.id]
          if (value) {
            children.push(
              new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun(value.title ?? value.icon)]
              }),
              new Paragraph({
                children: [new TextRun(value.item)]
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
        children: [
          new TextRun(title)
        ]
      })
    )
    for (const periodModel of section.items) {
      const period = state.periods.models[periodModel.id]!
      main.push(
        ...handlePeriod({ ...period, dateSettings, dateStyle: 'long' })
      )
      if (period.introduction) {
        main.push(new Paragraph({
          text: period.introduction
        }))
      }
      main.push(...periodModel.features.map(feat => new Paragraph({
        bullet: {
          level: 0
        },
        text: state.periodFeatures.models[feat]?.feature
      })))
    }
  }

  const doc = new Document({
    sections: [...profileMap, { children: main }]
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
