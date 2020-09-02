import {defaultRoute, withParametersRoute, withQueryRoute} from "./helloWorldService";

const mockTheResponse = () => {
    const mockSend = jest.fn();
    const response = {send: mockSend};
    return {mockSend, response};
};

function mockTheRequest(params: object, query: object = {}) {
    return {
        params,
        query
    };
}

describe('helloWorldService', () => {
    it('default route should respond with Hello World!', () => {
        const request = {};

        const {mockSend, response} = mockTheResponse();

        defaultRoute(request, response);
        expect(mockSend).toHaveBeenCalledWith('Hello World!');
    });

    it('withParameters should print path parameter passed', () => {
        const withParameters = 'aParam';
        const request = mockTheRequest({withParameters});

        const {mockSend, response} = mockTheResponse();
        withParametersRoute(request, response);
        expect(mockSend).toBeCalledWith(withParameters);
    });

    it('withQuery should print query param passed', () => {
        const queryParam = 'aQueryParam';
        const request = mockTheRequest({}, {queryParam});

        const {mockSend, response} = mockTheResponse();
        withQueryRoute(request, response);
        expect(mockSend).toBeCalledWith(queryParam);
    });
});