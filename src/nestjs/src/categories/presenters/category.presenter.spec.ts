import { instanceToPlain } from 'class-transformer';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './category.presenter';
import { PaginationPresenter } from '../../@share/presenter/pagination.presenter';

describe('CategoryPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      expect(presenter.id).toBe('61cd7b66-c215-4b84-bead-9aef0911aba7');
      expect(presenter.name).toBe('movie');
      expect(presenter.description).toBe('some description');
      expect(presenter.is_active).toBe(true);
      expect(presenter.created_at).toBe(created_at);
    });

    it('should be able to presenter data', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      const data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at: created_at.toISOString().slice(0, 19) + '.000z',
      });
    });
  });
});

describe('CategoryCollectionPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should be able set values', () => {
      const created_at = new Date();
      const presenter = new CategoryCollectionPresenter({
        items: [
          {
            id: 'ca32de7c-161d-4780-a7c9-89a7214a7f71',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at,
          },
        ],
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4,
      });

      expect(presenter.meta).toBeInstanceOf(PaginationPresenter);
      expect(presenter.meta).toEqual(
        new PaginationPresenter({
          current_page: 1,
          per_page: 2,
          last_page: 3,
          total: 4,
        }),
      );

      expect(presenter.data).toStrictEqual([
        new CategoryPresenter({
          id: 'ca32de7c-161d-4780-a7c9-89a7214a7f71',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at,
        }),
      ]);
    });

    it('should presenter data', () => {
      const created_at = new Date();
      let presenter = new CategoryCollectionPresenter({
        items: [
          {
            id: 'ca32de7c-161d-4780-a7c9-89a7214a7f71',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at,
          },
        ],
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4,
      });

      expect(instanceToPlain(presenter)).toStrictEqual({
        meta: {
          current_page: 1,
          per_page: 2,
          last_page: 3,
          total: 4,
        },
        data: [
          {
            id: 'ca32de7c-161d-4780-a7c9-89a7214a7f71',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at: created_at.toISOString().slice(0, 19) + '.000z',
          },
        ],
      });

      presenter = new CategoryCollectionPresenter({
        items: [
          {
            id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at,
          },
        ],
        current_page: '1' as any,
        per_page: '2' as any,
        last_page: '3' as any,
        total: '4' as any,
      });

      expect(instanceToPlain(presenter)).toStrictEqual({
        meta: {
          current_page: 1,
          per_page: 2,
          last_page: 3,
          total: 4,
        },
        data: [
          {
            id: '61cd7b66-c215-4b84-bead-9aef0911aba7',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at: created_at.toISOString().slice(0, 19) + '.000z',
          },
        ],
      });
    });
  });
});
