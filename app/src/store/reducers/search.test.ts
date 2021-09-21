import rewire from "rewire"
const search = rewire("@src/store/reducers/search")
const createReducer = search.__get__("createReducer")
// @ponicode
describe("createReducer", () => {
    test("0", () => {
        let callFunction: any = () => {
            createReducer()
        }
    
        expect(callFunction).not.toThrow()
    })
})
