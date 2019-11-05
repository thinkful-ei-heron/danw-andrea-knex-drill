/* eslint-disable no-console */
/* eslint-disable strict */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function searchByItemName(searchTerm){
  knexInstance
    .select('name', 'price', 'date_added', 'category', 'checked')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => {
      console.log(res);
    });
}

// searchByItemName('fish');

function paginateProducts(pageNumber){
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select('name', 'price', 'date_added', 'category', 'checked')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(res =>{
      console.log(res);
    });
}

paginateProducts(3);

function addedAfterDate(daysAgo){
  knexInstance
    .select('name', 'price', 'date_added', 'category', 'checked')
    .where(
      'date_added',
      '>',
      // eslint-disable-next-line quotes
      knexInstance.raw(`now() - '?? days' ::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .then(res =>{
      console.log(res);
    });
}

addedAfterDate(10);