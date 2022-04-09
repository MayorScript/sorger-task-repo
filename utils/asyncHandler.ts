export default function asyncHandler(handler:any) {
  return async (data?:any, id?:number) => {
    try {
      return await handler(data, id);
    } catch (ex) {
      throw ex;
    }
  };
}
