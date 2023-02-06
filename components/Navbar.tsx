
export default function Navbar() {
    return (
        <nav className="bg-[#40213B]">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2">

                <div className="relative flex items-center justify-between h-12">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block h-10 w-auto mr-2"
                                src="https://www.esfm.ipn.mx/assets/files/esfm/img/ESCUDO_ESFM.png"
                                alt="ESFM logo"
                            />
                            <h2 className=" hidden md:block text-center text-3xl font-bold tracking-tight text-slate-100">
                                Sistema Generador de Constancias ESFM
                            </h2>
                            <h2 className=" block md:hidden text-center text-3xl font-bold tracking-tight text-slate-100">
                                SGC ESFM
                            </h2>
                        </div> 
                    </div>
                  </div>
                </div>
            </nav>
      );
}