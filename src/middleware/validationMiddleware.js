import ApiError from "../errors/ApiError.js";

export const validate = async (schema, data, res) => {
  const parseResult = schema.safeParse(data);
  if (!parseResult.success) {
    const firstErrorMessage =
      parseResult.error.issues[0]?.message || "Invalid input.";
    const firstErrorKey = parseResult.error.issues[0]?.path[0];
    throw new ApiError(422, `${firstErrorKey}: ${firstErrorMessage}`);
  }
  return parseResult.data; // parsed and validated data
};
