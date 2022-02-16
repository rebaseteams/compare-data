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
            {
                type: 'stackbar',
                combined: true,
                name: 'Gender',
                mapperFunctionName: 'DemographicsStackGenderGetter',
            },
            {
                type: 'stackbar',
                combined: true,
                name: 'Income',
                mapperFunctionName: 'DemographicsStackIncomeGetter',
            }
        ]
    },
];