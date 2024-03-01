export default function Results({ res, res1 }: { res: string; res1: string }) {
	return (
		<form className="bg-yellow-800 text-white p-6 rounded-md w-1/3">
			<div className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white">
				<h1>{"Ora attuale: " + res}</h1>
			</div>
			<div className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white ">
				<h1>{"Prossima ora: " + res1}</h1>
			</div>
		</form>
	);
}


/*
    <label className="block mb-4">
            Classe:
            <input type="text" className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white" />
        </label>
        <label className="block mb-4">
            Sezione:
            <input type="text" className="mt-1 block w-full rounded-md bg-yellow-700 border-transparent focus:border-yellow-500 focus:bg-yellow-600 focus:ring-0 text-white" />
        </label>
        <div className="flex justify-center">
            <input type="submit" value="Submit" className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" />
        </div>

*/ 