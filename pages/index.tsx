import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import MultiSelect from '../components/MultiSelect';
import Head from 'next/head'



export default function Home() {

  // log env variable api_key
  const router = useRouter();
  const constancias_tipos = [
      {
        id: 1,
        name: 'BEIFI',
        avatar:'https://singlecolorimage.com/get/1E293B/100x100',
      },
      {
        id: 2,
        name: 'CONACYT',
        avatar: 'https://singlecolorimage.com/get/40213B/100x100',
      },
    ]
  interface PeriodoTipo {
    id: Number,
    name: String,
    avatar: String,
  }

  const [constancia_tipo, set_constancia_tipo] = useState(constancias_tipos[0]);
  const [periodo, setPeriodo] = useState({});
  const [periodos, setPeriodos] = useState([]);
  const [preview_src, setPreviewSrc] = useState('');

  useEffect(() => {
    const token:string = localStorage.getItem('token') || '';
    fetch('/api/catalogs/periods', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.ok) {
        const periodos = data.data.map((periodo: any, index: Number) => {
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          return {
            id: index,
            name: periodo,
            avatar: `https://singlecolorimage.com/get/${randomColor}/100x100`,
          }
        });
        setPeriodos(periodos);
        setPeriodo(periodos[periodos.length - 1]);
      }
    });
  }, []);

  function previewLetter(){
    const token:string = localStorage.getItem('token') || '';
    const fecha = document.getElementById('fecha') as HTMLInputElement;
    const periodo_2: PeriodoTipo = periodo as PeriodoTipo;
    console.log(fecha.value);
    setPreviewSrc(`/api/letters?constancia_tipo=${constancia_tipo.name.toLowerCase()}&fecha=${fecha.value}&periodo=${periodo_2.id}`);//#toolbar=0&navpanes=0&scrollbar=0`);
  }

  useEffect(() => {
    // check if token exists
      const token = localStorage.getItem('token');
      if(token) {
          fetch('/api/users/validate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({token})
          })
          .then(res => res.json())
          .then(data => {
              if(!data.ok) {
                  router.push('/login');
              }
          });
      } else{
        router.push('/login')
      } 
  }, []);


  return (
    <>
    <Head>
        <title>SGC ESFM | Generar</title>
    </Head>
    <main className="h-screen bg-[#131A25] text-slate-50 ">
    <Navbar/>
    <div className='flex items-center justify-center'>
      <div className="sm:w-full  md:w-5/6 xl:w-3/5 items-center justify-center divide-y  divide-gray-500">
        <div className="mb-3">
          <h1 className="text-2xl font-bold  mt-7">Generar constancias</h1>
          <p className="text-gray-400">
            Modifica los siguientes campos que son usados para generar las siguientes constancias
          </p>
        </div>
        <div className='pt-7 mb-3'>
          <div className="flex-col items-center justify-center grid grid-cols-3 gap-4">

            <div className="flex flex-col justify-center text-black w-full">
              <label htmlFor="name" className="text-sm text-slate-50 font-bold">Tipo Constancia <label className="text-red-400">*</label> </label>
              <MultiSelect constancias_tipos={constancias_tipos} selected={constancia_tipo} setSelected={set_constancia_tipo}/>
            </div>
            
            <div className="flex flex-col justify-center text-black w-full">
              <label htmlFor="fecha" className="text-sm text-slate-50 font-bold">Fecha <label className="text-red-400">*</label> </label>
              <input
                type="date"
                name="fecha"
                id="fecha"
                className="date text-white relative w-full hover:cursor-pointer rounded-md border border-gray-500 bg-[#070A0F] py-2 pl-3 pr-10 text-left shadow-sm focus:border-orange-500 focus:outline-none focus:ring-[0.5] focus:ring-orange-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col justify-center text-black w-full">
              <label htmlFor="name" className="text-sm text-slate-50 font-bold">Periodo <label className="text-red-400">*</label> </label> 
              <MultiSelect constancias_tipos={periodos} selected={periodo} setSelected={setPeriodo}/>
            </div>
          </div>
          <p className="text-gray-300 mt-2">La <b>fecha</b> se refiere a la que las constancias indicarán. El <b>periodo</b> es el periodo que se toma en cuenta para generar las constancias. </p>
        </div>
        <div className='pt-7 mb-3'>
          <div className="grid grid-cols-4 gap-5">
            <div>
              <p className="text-center font-bold mb-4">Previsualiza una constancia</p>
              <button onClick={previewLetter} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                Previsualizar
              </button>
            </div>
            <div className="col-span-3">
              <embed src={preview_src } height="500" style={{width:'-webkit-fill-available'}}/>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
    </>
  )
}
