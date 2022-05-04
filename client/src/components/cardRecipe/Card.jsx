import React from 'react';

const Card = ({ img }) => {
  return (
    <div className="page__card">
      <hr />
      <div className="page__img">
        <img src={img} alt="Фото рецепта" />
      </div>
      <div className="page__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa praesentium ab alias, consequatur, unde totam beatae temporibus aliquid qui quisquam, exercitationem provident velit consectetur magni sit. Officia dolorum magnam possimus quasi fuga culpa quae ipsam, omnis totam amet dolorem, fugit asperiores veritatis perferendis dicta voluptas sed facilis ut modi laborum. Aliquam voluptatem, nulla maxime delectus est officiis dicta, laudantium earum rem minus, quis reiciendis? Sapiente sequi libero mollitia suscipit.
      </div>
      <hr />
    </div>
  )
};

export default Card;