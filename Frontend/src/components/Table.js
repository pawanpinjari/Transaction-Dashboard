import React from 'react';

function Table({ transactions }) {
  return (
    <div>
      <div>
        <div className='table'>
          <div className='table-head'>ID</div>
          <div className='table-head'>Title</div>
          <div className='table-head'>Description</div>
          <div className='table-head'>Price</div>
          <div className='table-head'>Category</div>
          <div className='table-head'>Date of Sale</div>
          <div className='table-head'>Sold</div>
          <div className='table-head'>Image</div>
        </div>
      </div>
      <div >
        {transactions.map(t => (
          <div key={t._id} className='table'>
            <div className='table-item'>{t.id}</div>
            <div className='table-item'>{t.title}</div>
            <div className='table-item'>{t.description}</div>
            <div className='table-item'>{t.price}</div>
            <div className='table-item'>{t.category}</div>
            <div className='table-item'>
              {new Date(t.dateOfSale).toLocaleDateString('en-GB')}
            </div>

            <div className='table-item'>{t.sold ? 'Yes' : 'No'}</div>
            <div className='table-item'>
              <img src={t.image} className='table-image' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
