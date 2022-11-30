import qs from "qs";

const constructFromQueryString = (queryString: string) => {
  return qs.parse(queryString, { allowDots: true, depth: 1000 });
};

export const formDataToJson = (formData: FormData) => {
  const urlSearchParams = new URLSearchParams(formData as any);
  return constructFromQueryString(urlSearchParams.toString());
};
