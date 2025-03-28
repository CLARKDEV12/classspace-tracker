
import React from 'react';
import Layout from '@/components/Layout';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">Manage your application settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Configure general application settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <SettingsIcon className="h-12 w-12 text-gray-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
            <CardDescription>Customize your user experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <SettingsIcon className="h-12 w-12 text-gray-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
