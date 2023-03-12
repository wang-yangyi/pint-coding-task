import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [img, setImg] = useState([]);
  const [info, setInfo] = useState([]);
  const symbols = ['AAPL', 'NFLX', 'GOOG', 'AMZN', 'TSLA'];

  const getInfo = async(symbols) => {
    const finalarray = [];
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      console.log("fetching ",symbol);
      const resp = await fetch('/info/'+symbol);
      const jsoninfo = await resp.json();
      finalarray[i] = jsoninfo;
      console.log(jsoninfo);
    }
    setInfo(finalarray);
    console.log(info);
  };

  const getPic = async(symbols) => {
    //const imagearray = [];
    console.log(img);
    const imgarray = await Promise.all(symbols.map(async(symbol) => {
      const resp = await fetch('/pic/'+symbol);
      const image = await resp.blob();
      // const imageObject = URL.createObjectURL(image);
      // imagearray.push(imageObject);
      console.log(resp);
      console.log(image);
      return URL.createObjectURL(image);
      // console.log(imageObject);
      // console.log(imagearray);
    }));
    setImg(imgarray);
    console.log(img);
  };

  useEffect(() => {
    getInfo(symbols);
    getPic(symbols);
  }, []);

  return (
    <div className="grid">
      <div>
        {symbols.map((symbol, index) => 
        <div className ="stock grid">
          <div className ="stock-img">
            <img src={img[index]} alt="trial" className='imgsrc'/>
          </div>
          <div className='stock-name'>
            <div className='symbol-short'>{info[index].symbol}</div>
            <div className='symbol-long'>{info[index].companyName}</div>
          </div>
          <div className="stock-prices">
            <div className='stock-current'>{info[index].latestPrice.toFixed(2)}</div>
            <div className='stock-change'>
              <div className={info[index].change >= 0 ? 'positive-change': 'negative-change'}>{info[index].change.toFixed(2)}</div>
              <div className={info[index].changePercent >=0 ? 'positive-percent': 'negative-percent'}>{(info[index].changePercent * 10).toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
}

export default App;
