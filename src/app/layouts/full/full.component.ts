import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';


declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  tabStatus = 'justified';
  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin5' // six possible values: skin(1/2/3/4/5/6)
  };

  constructor(public router: Router,
             /* private permissionService: NgxPermissionsService*/) {
  }

  Logo(): void {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit(): void {
    /* if (this.router.url === '/') {
       this.router.navigate(['/dashboard/dashboard1']);
     }*/
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
  /*  const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token && !helper.isTokenExpired(token)) {
      const decodedToken = helper.decodeToken(token);
      const roles = decodedToken.roles;
      this.permissionService.loadPermissions(roles);
    }*/
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.handleSidebar();
  }

  handleSidebar(): void {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType(): void {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }
}
