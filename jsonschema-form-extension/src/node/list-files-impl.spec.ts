import { expect } from 'chai';
import { Container } from 'inversify';
import { ListFilesServiceImpl } from './list-files-impl'
import { resolve } from 'path';

describe('ListFilesService', () => {
    function setup() {
        const container = new Container();
        container.bind(ListFilesServiceImpl).toSelf().inSingletonScope();
        return container;
    }

    it(`says it's not a directory on an a file that is not a directory`, async () => {
        const uri = resolve('../workspace/test_file_1');
        const ListFilesService = setup().get(ListFilesServiceImpl);
        const files = await ListFilesService.listFiles(uri);
        expect(files).to.deep.equal(['this is not a directory']) // Use Chai syntax to implement the test
    });

    it(`lists the files`, async () => {
        const uri = resolve('../workspace/fixtures');
        const ListFilesService = setup().get(ListFilesServiceImpl);
        const files = await ListFilesService.listFiles(uri);
        expect(files).to.deep.equal(['test_file_1', 'test_file_2', 'test_file_3', 'test_folder']) // Use Chai syntax to implement the test
    });

    it(`shows an empty folder`, async () => {
        const uri = resolve('../workspace/fixtures/test_folder');
        const ListFilesService = setup().get(ListFilesServiceImpl);
        const files = await ListFilesService.listFiles(uri);
        expect(files).to.deep.equal([]) // Use Chai syntax to implement the test
    });
});
