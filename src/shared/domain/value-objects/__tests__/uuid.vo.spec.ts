import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

//Spy pode se considerar um mock
const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

describe('uuid unit tests', () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true)
    expect(validateSpy).toHaveBeenCalledTimes(1);

  });

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3c');
    expect(uuid.id).toBe('c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3c');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
});