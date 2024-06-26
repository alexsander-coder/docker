import { before } from "lodash";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity"

describe('category unit tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  })
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'movie'
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("shold create a category with all values", () => {
      const created_at = new Date()
      const category = new Category({
        name: 'movie',
        description: 'description movie',
        is_active: true,
        created_at
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBe('description movie');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBe(created_at);
    })

    test("should create a category with name and description", () => {
      const category = new Category({
        name: "movie",
        description: "movie description"
      })
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBe('movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })
  })

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "movie"
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("sohuld a category with description", () => {
      const category = Category.create({
        name: 'movie',
        description: "some description"
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })

    test("constructor all 3", () => {
      const created_at = new Date()
      const category = new Category({
        name: 'movie',
        description: 'description movie',
        is_active: false,
        created_at
      })
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie');
      expect(category.description).toBe('description movie');
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBe(created_at);
    });
  });

  describe('category_id field', () => {
    const arrange = [
      { category_id: null }, { category_id: undefined }, { category_id: new Uuid() }]
    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'movie',
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    })
  })

  test("should change name", () => {
    const category = Category.create({
      name: 'movie',
    });
    category.changeName("other name");
    expect(category.name).toBe("other name")
  });

  test("should change description", () => {
    const category = new Category({
      name: 'movie',
    });
    category.changeDescription("some description");
    expect(category.description).toBe("some description")
  });

  test("should active a category", () => {
    const category = Category.create({
      name: 'filmes',
      is_active: false
    });

    category.activate();
    expect(category.is_active).toBe(true)
  });

  test("should disable a category", () => {
    const category = Category.create({
      name: 'filmes',
      is_active: true
    });

    category.desactivate();
    expect(category.is_active).toBe(false)
  });
})