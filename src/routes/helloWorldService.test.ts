import {defaultRoute} from "./helloWorldService";

describe('helloWorldService', () => {
    it('default route should respond with Hello World!', () => {
        const request = {};

        const mockSend = jest.fn();
        const response = {send: mockSend};

        defaultRoute(request, response);
        expect(mockSend).toHaveBeenCalledWith('Hello World!');
    });
});