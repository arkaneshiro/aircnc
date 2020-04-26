'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Features', [
      { feature: 'Electric Burner', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867366/gwwwz7eegtts5uur1iht.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Gas Burner', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867416/vw2tdyob6betf2jud5nj.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Induction Range', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867441/xijjzi438pad1gq7kfsc.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Electric Oven', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867466/ynznyhwfsej2ix0hvdvz.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Convection Oven', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867489/spxzyhhxmbfea2a8kt3i.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Less Than 100sq. ft', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867508/jkofltfxe6uchud37ft5.jpg", createdAt: new Date(), updatedAt: new Date() },
      // { feature: '100 to 200sq. ft.', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      // { feature: 'More Than 200sq.ft', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867538/djwfzohiwzd6f0owg3mz.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Open Plan', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867558/mgmk4tibbixxmgqo8dxb.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Closed Plan', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867576/rtfm2cqsgxnineljtl3a.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Basic Ingredients Available', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867302/qm3onmivhzrt57qvygbz.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Basic Kitchen Gadgets', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867598/znvdiuzacagstriawbrt.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Prepaid Cleanup', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867615/bqkbtsuu8770kjbc6oxa.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Pots And Pans', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867632/xrpul23yjwutat0iahon.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Utensils And Dishware', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867648/ikdtigzai6uc3kg2urri.jpg", createdAt: new Date(), updatedAt: new Date() },
      // { feature: 'Extra Appliances', imgPath: 'somewhere', createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Dishwasher', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867683/oqnwlug4uuaeyhbwww7j.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Range Hood', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867703/qwcuplocaadfeq3jclyf.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Warming Drawer', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867720/ovso7p0mcqnjzkma3cto.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Microwave', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867742/ljywbjhzjbniqnquwokb.jpg", createdAt: new Date(), updatedAt: new Date() },
      { feature: 'Pressure Cooker', imgPath: "http://res.cloudinary.com/aircncaa/image/upload/v1587867756/pxyyrqc5dwm2rstl5plo.jpg", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Features', null, {})
  }
};
