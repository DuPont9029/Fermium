export default function Results({res, res1, status }: {res: string, res1: string, status: boolean}) {
    if (status === true) { return (
        <form className="bg-yellow-800 text-white p-6 rounded-md w-full sm:w-1/3">
            <div className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white">
                <h1>{"Ora attuale: " + res}</h1>
            </div>
            <div className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white">
                <h1>{"Prossima ora: " + res1}</h1>
            </div>
        </form>
    );
    } else if (status === false) { return (
        <form className="bg-green-800 text-white p-6 rounded-md w-full sm:w-1/3">
            <div className="mt-1 block w-full rounded-md bg-green-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white">
                <h1>{"ora successiva: " + res}</h1>
            </div>
            <div className="mt-1 block w-full rounded-md bg-green-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white">
                <h1>{"ora dopo: " + res1}</h1>
            </div>
        </form>
    );
    }
}