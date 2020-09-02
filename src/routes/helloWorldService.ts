export const defaultRoute = (request, response) => {
    response.send('Hello World!')
};

export const withParametersRoute = (request, response) => {
    const {withParameters} = request.params;
    response.send(withParameters);
};

export const withQueryRoute = (request, response) => {
    const {queryParam} = request.query;

    response.send(queryParam);
};