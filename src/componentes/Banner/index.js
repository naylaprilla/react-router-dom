import styles from './Banner.module.css'
import circuloColorido from 'assets/circulo_colorido.png'
import minhaFoto from 'assets/minha_foto.jpg'

export default function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.apresentacao}>
                <h1 className={styles.titulo}>
                    Olá, Mundo!
                </h1> 

                <p className={styles.paragrafo}>
                    Olá, eu sou a Nayla Prilla. Sou mãe, esposa, dona de casa, estudante de programação e ilustradora nas horas vagas. 
                    Tenho interesse em series, animes, plantinhas, yoga, bichinhos fofinhos e musicas indie. 
                </p>               
            </div>

            <div className={styles.imagens}>
                <img 
                    className={styles.circuloColorido} 
                    src={circuloColorido} 
                    alt=''
                    aria-hidden={true}
                />

                <img
                    className={styles.minhaFoto} 
                    src={minhaFoto} 
                    alt='foto da Nayla Prilla'
                />
            </div>
        </div>
    )
}