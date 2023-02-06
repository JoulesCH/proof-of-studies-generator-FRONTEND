import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { useState } from 'react';

export default function Login() {
    const router = useRouter(); // router.push('/')
    const [alert, setAlert] = useState(<></>);
    
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
                if(data.ok) {
                    // save token in localstorage
                    router.push('/');
                } else {
                    localStorage.removeItem('token');
                    setAlert(
                    <div id="alert-additional-content-2" className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Credenciales obsoletas</h3>
                        </div>
                        <div className="mt-2 mb-4 text-sm">
                            Debes iniciar sesión nuevamente.
                        </div>
                    </div>
                    );
                }
            });
        } 
    }, []);

    const loginFunction = (e:any) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const data = {
            username,
            password
        }
        // fetch to api
        fetch('/api/users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.ok) {
                // save token in localstorage
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                setAlert(
                    <div id="alert-additional-content-2" className="p-4 mt-7 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Error</span>
                            <h3 className="text-lg font-medium">Credenciales inválidas</h3>
                        </div>
                        <div className="mt-2 mb-4 text-sm">
                            Asegúrate de que tu usuario y contraseña sean correctos.
                        </div>
                    </div>
                );
                //timer
                setTimeout(() => {
                    setAlert(<></>);
                }, 5000);
            }
        })
    }

    return (
        <>
            <Head>
                <title>SGC ESFM | Login</title>
            </Head>
          <div className="flex h-screen items-center justify-center bg-[#40213B]">
            <div className="w-full max-w-md bg-white p-6 rounded-lg">
              <div>
                <img
                  className="mx-auto h-32 w-auto"
                  src="https://i.ibb.co/RcRYr2B/42930699-1369239259874228-4224427483274936320-n.jpg"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sistema Generador de Constancias ESFM
                </h2>
                <p className="mt-2 text-center text-base text-gray-600 ">
                  Iniciar sesión
                </p>
                {alert}
              </div>
              <form className="mt-8 space-y-6" onSubmit={e => loginFunction(e)}>
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Usuario
                    </label>
                    <input
                      id="username"
                      name="email"
                      type="text"
                      autoComplete="username"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
}