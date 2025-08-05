import { MetadataRoute } from 'next';
import { products } from '@/lib/product-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shreyan.site';

    const mainRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1,
        }
    ];

    const projectRoutes = [
        'ai-code-assistant',
        'quantumleap-ecommerce',
        'collaborative-whiteboard',
        'dataviz-dashboard',
        'ai-fitness-coach',
        'generative-art-studio'
    ].flatMap(project => ([
        {
            url: `${baseUrl}/projects/${project}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8
        },
        {
            url: `${baseUrl}/projects/${project}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7
        }
    ]));

    const productDetailRoutes = products.map(product => ({
        url: `${baseUrl}/projects/quantumleap-ecommerce/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));


  return [
    ...mainRoutes,
    ...projectRoutes,
    ...productDetailRoutes
  ];
}
