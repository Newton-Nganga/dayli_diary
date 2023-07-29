import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import logo from '../../public/proj_logo.png'

export default function Navbar({setState}) {
  return (
    <nav className={styles.homepage_nav}>
    <Link href="/">
      <Image src={logo} alt="logo" className={styles.nav_logo}/>
    </Link>
    <div className={styles.collapsible_nav}>
      <ul>
        <li className={styles.nav_link}><Link href='#Home'>Home</Link></li>
        <li className={styles.nav_link}><Link href='#Why_us'>Why us?</Link></li>
        <li className={styles.nav_link}><Link href='#About'>About</Link></li>
        <li className={styles.nav_link}><Link href='#Contact'>Contact</Link></li>
        <li className={styles.nav_btn} onClick={()=>setState({open:true,form:"login"})}><button>Login</button></li>
      </ul>
    </div>
  </nav>
  )
}
