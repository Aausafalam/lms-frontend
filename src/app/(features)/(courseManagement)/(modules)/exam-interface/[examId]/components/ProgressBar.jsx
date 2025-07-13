export default function ProgressBar({ current, total, answered, marked }) {
    const progress = (current / total) * 100;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {current} of {total} questions
                </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{answered}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Answered</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{marked}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Marked</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{total - answered}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Remaining</div>
                </div>
            </div>
        </div>
    );
}
