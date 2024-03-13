type TStatsDataProps = { totalRevenue: number; totalSales: number };

const StatsCard = ({ statsData }: { statsData: TStatsDataProps }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
      <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-indigo-600">Total Revenue</span>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div>
            <svg
              className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="text-2xl 2xl:text-3xl font-bold">{statsData?.totalRevenue} TK</span>
              <div className="flex items-center ml-2 mb-1">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-green-600">Total Sales</span>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div>
            <svg
              className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="text-2xl 2xl:text-3xl font-bold">{statsData?.totalSales}</span>
              <div className="flex items-center ml-2 mb-1">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsCard;
