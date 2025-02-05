import { ulid } from "ulid";
import { ResourceCreate } from "../../../src/api/resources/resource.dto";
import { ResourceInput } from "../../../src/api/resources/resource.entity";
import { UnitTypes } from "../../../src/enums/unitTypes";
import { api } from "../../utils/apiProvider"

describe("e2e resource test", () => {  

  const resourceData: ResourceCreate = {    
    name: "Farinha de Trigo",
    quantity: 100,
    averageCostPerUnit: 1.5,
    unitId: UnitTypes.kg,
  };
  
  let id: string;

  it("1° Create new resource", async () => {
    const response = await api.post('/resources', resourceData);

    const data = await response.json() as any;

    let expectedResult = {
      ...resourceData,
      id: data.id,
      lastEntryAt: null
    } as ResourceInput;

    expect(data).toEqual(expectedResult);

    id = data.id;
  })


  it("2° Retrieve created resource by id", async () => {

    const response = await api.get(`/resources/${id}`);

    const data = await response.json() as any;

    let expectedResult = {
      ...resourceData,
      id: data.id,
      lastEntryAt: null
    } as ResourceInput;

    expect(data).toEqual(expectedResult);
  })

  it("3° Trying to retrieve an inexistent resource id", async () => {

    const response = await api.get(`/resources/${ulid()}`);        

    expect(response.status).toBe(404);
  })

})