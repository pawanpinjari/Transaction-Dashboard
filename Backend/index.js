const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./Schema/Product');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/product')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
     
      await Product.deleteMany({});
      await Product.insertMany(response.data);
      res.send('Database seeded successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  



  app.post('/transactions', async (req, res) => {
    const { month,year, page = 1, perPage = 10, search = '' } = req.body;
   

    const pageInt = parseInt(page);
    const perPageInt = parseInt(perPage);

    const search1 = {};
    if (search) {
        const searchNumber = parseFloat(search);
        if (!isNaN(searchNumber)) {
          search1.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: searchNumber }
            ];
        } else {
          search1.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
    }




    try {
        const transactions = await Product.find(search1)

            if (transactions && transactions.length > 0 && month) {
           var  transaction11 = transactions.filter(transaction1 => {
                var date=new Date(transaction1.dateOfSale)
                var month1=date.getMonth()+1
                
                return month == month1;
              });
              
              }
            const data = transaction11.slice((pageInt - 1) * perPageInt, pageInt * perPageInt);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error.' });
    }
});


  

  app.post('/statistics', async (req, res) => {
    const { month } = req.body;

    const stat1 = await Product.find({ });

    if (stat1 && stat1.length > 0 && month) {
      var  stat = stat1.filter(statdata => {
           var date=new Date(statdata.dateOfSale)
           var month1=date.getMonth()+1
           
           return month == month1;
         });
         
      }

    const statAmount = stat.reduce((acc, t) => acc + (t.sold ? t.price : 0), 0);
    const statSoldItems = stat.filter(t => t.sold).length;
    const statNotSoldItems = stat.filter(t => !t.sold).length;

    res.json({ statAmount, statSoldItems, statNotSoldItems });
  });

  app.post('/bar-chart', async (req, res) => {
    const { month } = req.body;
    const bar = await Product.find({ })
  var bardata=bar.filter(transaction1 => {
    var date=new Date(transaction1.dateOfSale)
    var month1=date.getMonth()+1
    
    return month == month1;
  });;
    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    bardata.forEach(t => {
      if (t.price <= 100) priceRanges['0-100']++;
      else if (t.price <= 200) priceRanges['101-200']++;
      else if (t.price <= 300) priceRanges['201-300']++;
      else if (t.price <= 400) priceRanges['301-400']++;
      else if (t.price <= 500) priceRanges['401-500']++;
      else if (t.price <= 600) priceRanges['501-600']++;
      else if (t.price <= 700) priceRanges['601-700']++;
      else if (t.price <= 800) priceRanges['701-800']++;
      else if (t.price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });
  
    res.json(priceRanges);
  });


  app.post('/pie-chart', async (req, res) => {
    const { month } = req.body;
    const pie = await Product.find({ });
    var piedata=pie.filter(e => {
      var date=new Date(e.dateOfSale)
      var month1=date.getMonth()+1
      
      return month == month1;
    });;
    const categories = {};
  
    piedata.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + 1;
    });
  
    res.json(categories);
  });

  app.post('/combined', async (req, res) => {
    const { month } = req.body;
    const statistics = await axios.post('http://localhost:8000/statistics', { month});
    const barChart = await axios.post('http://localhost:8000/bar-chart', { month});
    const pieChart = await axios.post('http://localhost:8000/pie-chart', { month});
    res.json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  });
  
  
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
