

export const initStore: ModelStore = {
  iconicItems: {
    models: {
      0: {
        id: '0',
        icon: 'location-pin',
        item: 'Texas',
        era: '0',
        order: 0
      },
      1: {
        id: '1',
        icon: 'horse',
        item: 'Ridin them wild horses',
        era: '6',
        order: 1
      },
      2: {
        id: '2',
        icon: 'hat',
        item: 'Bein a proper gentleman',
        era: '5',
        order: 2
      }
    },
    count: 2
  },
  ratedSkills: {
    models: {
      0: {
        id: '0',
        skill: 'Texan',
        rating: 1,
        era: '3',
        order: 0
      }
    },
    count: 0
  },
  periods: {
    models: {
      0: {
        id: '0',
        title: 'Watching cows',
        subtitle: 'Local farm',
        introduction: 'This is the life I been leadin\' at that farm hitherto',
        startDate: new Date(1955, 3),
        era: '1',
        order: 0
      },
      1: {
        id: '1',
        title: 'Agrarian university',
        subtitle: 'Texas',
        startDate: new Date(1949, 1),
        endDate: new Date(1953, 1),
        era: '2',
        order: 1
      },
      2: {
        id: '2',
        title: 'Diggin fer gold',
        subtitle: 'Rocky mountains',
        introduction: 'Ain\'t found much gold, but done a lotta diggin',
        startDate: new Date(1959, 5),
        endDate: new Date(1963, 11),
        era: '4',
        order: 2
      }
    },
    count: 2
  },
  periodFeatures: {
    models: {
      0: {
        id: '0',
        order: 0,
        feature: 'I seen em cows grow from calves',
        period: '0'
      },
      1: {
        id: '1',
        order: 1,
        feature: 'I seen em leaves grow from green to yella',
        period: '0'
      },
      2: {
        id: '2',
        order: 2,
        feature: 'I seen da sun rise at dawn and seen it settin over yon',
        period: '0'
      }
    },
    count: 2
  },
  eras: {
    models: {
      0: {
        id: '0',
        title: 'Profile',
        profile: '0',
        order: 0
      },
      1: {
        id: '1',
        title: 'Experience',
        profile: '0',
        order: 1
      },
      2: {
        id: '2',
        title: 'Education',
        profile: '0',
        order: 6
      },
      3: {
        id: '3',
        title: 'Languages',
        profile: '0',
        order: 2
      },
      4: {
        id: '4',
        title: 'Projects',
        profile: '0',
        order: 4
      },
      5: {
        id: '5',
        title: 'Theory',
        profile: '0',
        order: 5
      },
      6: {
        id: '6',
        title: 'Skills',
        profile: '0',
        order: 3
      }
    },
    count: 6
  },
  profiles: {
    models: {
      0: {
        id: '0',
        firstName: 'John',
        lastName: 'Wayne',
        profession: 'Cowboy',
        description: 'Been leadin\' them cows to pasture ever since I was a kid, and ain\'t none of em ever complained',
        img: 'john-wayne.webp'
      }
    },
    count: 0
  }
}
