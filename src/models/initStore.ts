

export const initStore: ModelStore = {
  iconicItems: {
    models: {
      0: {
        id: '0',
        icon: 'map-marker',
        item: 'Texas',
        era: '0'
      }
    }
  },
  ratedSkills: {
    models: {}
  },
  periods: {
    models: {
      0: {
        id: '0',
        title: 'Watching cows',
        subtitle: 'Local farm',
        introduction: 'This is the life I been leadin\' at that farm hitherto',
        startDate: new Date(1955, 3),
        era: '1'
      }
    }
  },
  periodFeatures: {
    models: {
      0: {
        id: '0',
        feature: 'I seen em cows grow from calves',
        period: '0'
      },
      1: {
        id: '1',
        feature: 'I seen em leaves grow from green to yella',
        period: '0'
      },
      2: {
        id: '2',
        feature: 'I seen da sun rise at dawn and seen it settin over yon',
        period: '0'
      }
    }
  },
  eras: {
    models: {
      0: {
        id: '0',
        title: 'Profile',
        profile: '0'
      },
      1: {
        id: '1',
        title: 'Experience',
        profile: '0'
      }
    }
  },
  profiles: {
    models: {
      0: {
        id: '0',
        firstName: 'John',
        lastName: 'Wayne',
        profession: 'Cowboy',
        description: 'Been leadin\' them cows to pasture ever since I was a kid, and ain\'t none of em ever complained.',
        img: 'john-wayne.webp'
      }
    }
  }
}
