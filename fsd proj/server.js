const http = require('http');
const url = require('url');

const port = 3000;

const countryData = {
    germany: {
        title: "Germany's Energy Crisis",
        description: "Germany is facing challenges in its energy transition (Energiewende). The country aims to phase out nuclear power and coal while increasing renewable energy sources. However, this has led to higher electricity prices and concerns about grid stability.",
        image: "https://www.cleanenergywire.org/sites/default/files/styles/paragraph_text_image/public/paragraphs/images/fig10-germany-energy-mix-energy-sources-share-primary-energy-consumption-2020.png?itok=Nryt4f9b"
    },
    india: {
        title: "India's Energy Dilemma",
        description: "India is grappling with a growing demand for energy and a heavy reliance on coal. The country is working to expand its renewable energy capacity, particularly in solar power, but faces challenges in modernizing its power infrastructure and reducing air pollution.",
        image: "https://th.bing.com/th/id/R.12f2e73be80828d38cf55659cbf3965b?rik=bo4zqfxzSwfX5g&riu=http%3a%2f%2fcdn.static-economist.com%2fsites%2fdefault%2ffiles%2fimagecache%2foriginal-size%2fimages%2f2016%2f06%2fblogs%2fgraphic-detail%2f20160611_wom909_0.png&ehk=%2bBmm5MZ%2fMw1XE4bvmYWu7e4%2f%2fyV3F3k%2bAkWcyP4ZyWM%3d&risl=&pid=ImgRaw&r=0"
    },
    brazil: {
        title: "Brazil's Hydropower Challenges",
        description: "Brazil heavily relies on hydroelectric power, which is vulnerable to droughts. In recent years, low rainfall has led to energy shortages and increased use of more expensive and polluting thermal power plants. The country is working to diversify its energy mix with wind and solar power.",
        image: "https://www.researchgate.net/profile/Marcela-Costa-Pinto-Reggiani/publication/295831765/figure/fig4/AS:667788653903877@1536224630167/Electricity-demand-per-capita-Source-IEA-Implementing-Agreement-1999-Hydropower-A_Q640.jpg"
    }
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (path.startsWith('/api/country/')) {
        const country = path.split('/')[3];
        
        if (countryData[country]) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(countryData[country]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Country not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});