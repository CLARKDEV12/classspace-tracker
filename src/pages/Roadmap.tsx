
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyState from '@/components/EmptyState';
import { Building } from 'lucide-react';
import Layout from '@/components/Layout';

const Roadmap: React.FC = () => {
  // In the future, this will be populated with actual building data
  const buildings: any[] = [];
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Building Roadmap</h1>
        <p className="text-gray-500">Overview of all buildings and their rooms</p>
      </div>
      
      {buildings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <Card key={building.id}>
              <CardHeader>
                <CardTitle>{building.name}</CardTitle>
                <CardDescription>Total Rooms: {building.totalRooms}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Building data will go here */}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<Building className="h-12 w-12 text-gray-400" />}
          title="No Buildings Added Yet"
          description="Buildings and their layouts will appear here once added."
        />
      )}
    </Layout>
  );
};

export default Roadmap;
