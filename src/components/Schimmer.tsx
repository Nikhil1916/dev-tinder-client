
const Schimmer = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-gray-800 rounded-lg shadow-md my-2">
    <div className="animate-pulse flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
  
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  </div>
  
  )
}

export default Schimmer