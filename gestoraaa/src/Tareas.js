import { useState, Suspense, lazy } from 'react';


const CreaTarea = lazy(() => import('./CreaTarea'));
const Kanban = lazy(() => import('./Kanban'));
const Cronograma = lazy(() => import('./Cronograma'));

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      name: 'Crea Tarea', 
      component: <CreaTarea />
    },
    { 
      name: 'Tablero', 
      component: <Kanban />
    },
    { 
      name: 'Cronograma', 
      component: <Cronograma />
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="tabs-wrapper bg-white rounded-lg shadow-sm">
          <div className="flex">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none ${
                  activeTab === index
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 border-b-2 border-transparent'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out">
          <Suspense fallback={<div>Cargando...</div>}>
            {tabs[activeTab].component}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;