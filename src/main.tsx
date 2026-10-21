import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles.css';

type ErrorState={error:string|null};
class ErrorBoundary extends React.Component<React.PropsWithChildren,ErrorState>{
  state:ErrorState={error:null};
  static getDerivedStateFromError(error:Error):ErrorState{
    return {error:error?.message||'Erro inesperado ao abrir o painel'};
  }
  componentDidCatch(error:Error,details:React.ErrorInfo){
    console.error('Falha ao iniciar o dashboard:',error,details.componentStack);
  }
  render(){
    if(this.state.error)return <main style={{maxWidth:540,margin:'10vh auto',padding:24,fontFamily:'Inter,Arial,sans-serif',color:'#20304a'}}>
      <h1 style={{fontSize:23}}>Não foi possível abrir o painel</h1>
      <p>O aplicativo encontrou um erro de carregamento.</p>
      <pre style={{background:'#fff0f5',padding:14,whiteSpace:'pre-wrap',overflowWrap:'anywhere',borderRadius:10,fontSize:12}}>{this.state.error}</pre>
      <button onClick={()=>location.reload()} style={{background:'#F27999',color:'#fff',border:0,padding:'12px 18px',borderRadius:9,cursor:'pointer'}}>Atualizar painel</button>
    </main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
