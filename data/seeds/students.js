
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Harry'},
        {name: 'Hermione'},
        {name: 'Ron'},
        {name: 'Draco'},
        {name: 'Luna'},
        {name: 'Neville'}
      ]);
    });
};
