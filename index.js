const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const {
    IamAuthenticator
} = require('ibm-watson/auth');

let NATURAL_LANGUAGE_UNDERSTANDING_APIKEY = process.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY;
let NATURAL_LANGUAGE_UNDERSTANDING_URL = process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL;

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-03-25',
    authenticator: new IamAuthenticator({
        apikey: NATURAL_LANGUAGE_UNDERSTANDING_APIKEY,
    }),
    serviceUrl: NATURAL_LANGUAGE_UNDERSTANDING_URL,
    disableSslVerification: true,
});

exports.handler = async (event) => {

    const analyzeParams = {
        'text': event.historial_clinico,
        //'url': 'www.ibm.com',
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 5,
            },
            'keywords': {
                'emotion': true,
                'sentiment': true,
                'limit': 5,
            },
        },
    };

    let result;

    await naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            result = analysisResults.result;
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            result = { error: err};
            console.log('error:', err);
        });

    // TODO implement
    const response = {
        statusCode: 200,
        body: result,
    };
    return response;
};