
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, FileText, User, Upload, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const WelcomeOnboarding = ({ userName = 'User' }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const services: ServiceOption[] = [
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      description: 'Upload and analyze your business data for actionable insights'
    },
    {
      id: 'revenue-optimization',
      title: 'Revenue Optimization',
      icon: <User className="h-8 w-8 text-purple-500" />,
      description: 'Identify and capitalize on revenue opportunities'
    },
    {
      id: 'data-integration',
      title: 'Data Integration',
      icon: <Upload className="h-8 w-8 text-green-500" />,
      description: 'Connect your existing systems to our platform'
    },
    {
      id: 'consulting',
      title: 'Consulting Services',
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      description: 'Get expert guidance from our team of specialists'
    },
  ];

  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
  };

  const handleContinue = () => {
    // In a real app, this would save the user's selection
    // and customize their experience
    if (selectedService) {
      localStorage.setItem('selectedService', selectedService);
      localStorage.setItem('onboardingComplete', 'true');
      
      // Navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="text-center pb-8">
        <div className="flex justify-center mb-6">
          <img
            src="/lovable-uploads/78ce9c1d-4a0e-48f9-b47b-d2ed2bacdbe5.png"
            alt="Revify Logo"
            className="w-48 h-auto object-contain"
          />
        </div>
        <CardTitle className="text-3xl font-bold">Welcome to Revify, {userName}</CardTitle>
        <CardDescription className="text-lg mt-2">
          What do you need help with?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="font-medium text-primary">Please select a category</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className={`
                relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200
                ${selectedService === service.id 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }
              `}
            >
              {selectedService === service.id && (
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="mb-4">
                {service.icon}
              </div>
              
              <h3 className="text-lg font-medium mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedService}
          size="lg"
          className="px-8 bg-green-base hover:bg-green-hover text-white"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeOnboarding;
