export const metadata = [
    {
        name: 'Demographics',
        description: 'Demographics information of artists', // TODO: Get correct heading from client.
        data: [
            {
                type: 'stackbar',
                combined: true,
                name: 'Age',
                mapperFunctionName: 'DemographicsStackAgeGetter',
            },
        ]
    },
    {
        name: 'Followers Growth',
        description: 'To show the followers growth trend for the artist on different platform', // TODO
        data: [
            {
                type: 'line',
                combined: true,
                name: 'Twitter',
                mapperFunctionName: 'FollowersSpotifyGetter',
            },
        ]

    },
];