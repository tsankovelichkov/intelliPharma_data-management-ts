import { log } from "console";
import { databaseFindByRetailCompany } from "../database/database";

const duplicateIdsChecker = async (retailCompany: string) => {
  const allProducts = await databaseFindByRetailCompany(retailCompany);
  const duplicateIdsArr: string[] = [];

  if (!allProducts) return;

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

const duplicateTitlesChecker = async (retailCompany: string) => {
  const allProducts = await databaseFindByRetailCompany(retailCompany);
  const duplicateTitlesArr: string[] = [];

  if (!allProducts) return;

  for (let index = 0; index < allProducts.length; index++) {
    const targetTitle = allProducts[index].title;

    const filteredArr = allProducts.filter(
      (product) => product.productId === targetTitle
    );

    if (filteredArr.length > 1 && !duplicateTitlesArr.includes(targetTitle))
      duplicateTitlesArr.push(targetTitle);
  }

  return duplicateTitlesArr;
};

export const findDuplication = async (retailCompany: string) => {
  const duplicateIds = await duplicateIdsChecker(retailCompany);
  const duplicateTitles = await duplicateTitlesChecker(retailCompany);

  log(duplicateIds);
  log(duplicateTitles);
};

findDuplication("REMEDIUM");
