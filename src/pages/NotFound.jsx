import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import WireframeGlobe from '../components/WireframeGlobe';
import './NotFound.css';

export default function NotFound() {
    return (
        <main className="not-found">
            <div className="not-found__globe">
                <WireframeGlobe size={500} />
            </div>

            <div className="not-found__content container">
                <span className="not-found__code">404</span>
                <h1 className="not-found__title">
                    Página não <span className="text-gradient">encontrada</span>
                </h1>
                <p className="not-found__text">
                    Parece que você se perdeu nas ruas. Essa página não existe ou foi movida.
                </p>
                <div className="not-found__actions">
                    <Link to="/" className="btn btn-primary btn-lg">
                        <Home size={18} /> Voltar ao Início
                    </Link>
                    <Link to="/shop" className="btn btn-outline btn-lg">
                        <ArrowLeft size={18} /> Ir para a Loja
                    </Link>
                </div>
            </div>
        </main>
    );
}
