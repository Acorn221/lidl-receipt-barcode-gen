"use client";

import { useState, useEffect, useCallback } from 'react';
import Barcode from 'react-barcode';

export default function BarcodeGenerator() {
  const [storeId, setStoreId] = useState('0888');
  const [sequence, setSequence] = useState('1443');
  const [receiptNum, setReceiptNum] = useState('021768');
  const [register, setRegister] = useState('72');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const generateRandomDateTime = useCallback(() => {
    const now = new Date();
    // Random milliseconds within last 5 minutes (300000ms)
    const randomMs = Math.floor(Math.random() * 300000);
    const randomTime = new Date(now.getTime() - randomMs);
    
    // Format date as DDMMYY
    const day = randomTime.getDate().toString().padStart(2, '0');
    const month = (randomTime.getMonth() + 1).toString().padStart(2, '0');
    const year = randomTime.getFullYear().toString().slice(-2);
    const formattedDate = `${day}${month}${year}`;
    
    // Format time as HHMM
    const hours = randomTime.getHours().toString().padStart(2, '0');
    const minutes = randomTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}${minutes}`;
    
    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  // Generate random date/time within last 5 minutes on mount
  useEffect(() => {
    generateRandomDateTime();
  }, [generateRandomDateTime]);

  const generateBarcode = useCallback(() => {
    return `${storeId}${sequence}${receiptNum}${register}${date}`;
  }, [storeId, sequence, receiptNum, register, date]);

  const generateHex = useCallback((barcode: string) => {
    return barcode
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ')
      .toUpperCase();
  }, []);

  const formatDate = useCallback((dateStr: string) => {
    if (dateStr.length === 6) {
      return `${dateStr.slice(0, 2)}/${dateStr.slice(2, 4)}/${dateStr.slice(4, 6)}`;
    }
    return dateStr;
  }, []);

  const formatTime = useCallback((timeStr: string) => {
    if (timeStr.length === 4) {
      return `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}`;
    }
    return timeStr;
  }, []);

  const handleCopyBarcode = useCallback(() => {
    const barcode = generateBarcode();
    void navigator.clipboard.writeText(barcode);
  }, [generateBarcode]);

  const barcode = generateBarcode();
  const hexValue = generateHex(barcode);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-green-400">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-green-400 sm:text-[3rem] font-mono">
          [LIDL] <span className="text-white">&gt;&gt;</span> BARCODE <span className="text-white">&lt;&lt;</span> GENERATOR
        </h1>
        
        <div className="w-full max-w-2xl bg-gray-900 border border-green-400 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-400 font-mono">
            &gt; RECEIPT_COMPONENTS
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">STORE_ID:</label>
              <input
                type="text"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value.slice(0, 4))}
                className="w-full px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="0888"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">SEQUENCE:</label>
              <input
                type="text"
                value={sequence}
                onChange={(e) => setSequence(e.target.value.slice(0, 4))}
                className="w-full px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="1443"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">RECEIPT_NUM:</label>
              <input
                type="text"
                value={receiptNum}
                onChange={(e) => setReceiptNum(e.target.value.slice(0, 6))}
                className="w-full px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="021768"
                maxLength={6}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">REGISTER:</label>
              <input
                type="text"
                value={register}
                onChange={(e) => setRegister(e.target.value.slice(0, 2))}
                className="w-full px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="72"
                maxLength={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">DATE_DDMMYY:</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value.slice(0, 6))}
                className="w-full px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="290525"
                maxLength={6}
              />
              <p className="text-xs text-green-600 mt-1 font-mono">\// {formatDate(date)}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">TIME_HHMM:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value.slice(0, 4))}
                  className="flex-1 px-3 py-2 bg-black border border-green-400 text-green-400 font-mono placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="1410"
                  maxLength={4}
                />
                <button
                  onClick={generateRandomDateTime}
                  className="px-3 py-2 bg-green-400 hover:bg-green-300 text-black font-mono text-xs font-bold transition-colors whitespace-nowrap"
                >
                  RND
                </button>
              </div>
              <p className="text-xs text-green-600 mt-1 font-mono">\// {formatTime(time)}</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-gray-900 border border-green-400 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-400 font-mono">
            &gt; BARCODE_OUTPUT
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-4 border border-green-400 flex justify-center">
              <Barcode 
                value={barcode} 
                format="CODE128"
                width={2}
                height={60}
                displayValue={true}
                fontSize={14}
                margin={10}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">RAW_DATA:</label>
              <div className="bg-black border border-green-400 p-4 font-mono text-lg break-all text-green-400">
                {barcode}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">HEX_VALUES:</label>
              <div className="bg-black border border-green-400 p-4 font-mono text-sm break-all text-green-400">
                {hexValue}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-green-400 font-mono">STRUCT_BREAKDOWN:</label>
              <div className="bg-black border border-green-400 p-4 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-white">STORE_ID:</span>
                  <span className="text-green-400">{storeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">SEQUENCE:</span>
                  <span className="text-green-400">{sequence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">RECEIPT_NUM:</span>
                  <span className="text-green-400">{receiptNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">REGISTER:</span>
                  <span className="text-green-400">{register}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">DATE:</span>
                  <span className="text-green-400">{date} \// {formatDate(date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">TIME:</span>
                  <span className="text-green-400">{time} \// {formatTime(time)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center align-middle">
          <div className="flex gap-4 md:flex-row flex-col max-w-2xl m-auto w-full md:w-auto">
            <button
              onClick={handleCopyBarcode}
              className="px-6 py-3 bg-green-400 hover:bg-green-300 text-black font-mono font-bold transition-colors w-full md:w-auto"
            >
              COPY_TO_CLIPBOARD()
            </button>
            <button
              onClick={generateRandomDateTime}
              className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-mono font-bold transition-colors w-full md:w-auto"
            >
              REGENERATE_DATETIME()
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 font-bold font-mono">
        Vibe coded in Shoreham-By-Sea ❤️
      </div>
    </main>
  );
}