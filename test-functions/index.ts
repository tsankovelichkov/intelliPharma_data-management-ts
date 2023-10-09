import { databaseFindByRetailCompany } from "../database/database";

export const collectorDuplicateIdsChecker = async (retailCompany: string) => {
  const allProducts = await databaseFindByRetailCompany(retailCompany);
  const duplicateIdsArr: string[] = [];

  for (let index = 0; index < allProducts.length; index++) {
    const targetId = allProducts[index].productId;

    const filteredArr = allProducts.filter(
      (product) => product.productId === targetId
    );

    if (filteredArr.length > 1 && !duplicateIdsArr.includes(targetId))
      duplicateIdsArr.push(targetId);
  }

  return duplicateIdsArr;
};
