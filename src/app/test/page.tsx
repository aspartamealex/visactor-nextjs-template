import TestApi from '@/components/TestApi';

export default function TestPage() 
{
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">PHP API Integration Test</h1>
            <TestApi />
        </div>
    );
} 