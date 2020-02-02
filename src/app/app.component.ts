import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    cssFiles = ['bootstrap.min.css', 'animate.css', 'aos.css', 'swiper.min.css', 'owl.carousel.min.css', 'owl.theme.default.min.css', 'all.min.css', 'themify-icons.css', 'styles.css', 'responsive.css',];
    jsFiles = ['jquery-3.3.1.min.js', 'jquery.instagramFeed.min.js', 'popper.min.js', 'bootstrap.min.js', 'aos.js', 'swiper.min.js', 'isotope.pkgd.min.js', 'imagesloaded.pkgd.min.js', 'masonry.pkgd.min.js', 'owl.carousel.min.js', 'jquery.zoom.js'];
    sticky = null;
    header = null;

    loadFile(path, type) {
        let fileref;
        if (type == "js") {
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", path);
        }
        else if (type == "css") {
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", path);
        }
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

    ngOnInit(): void {
        for (let css of this.cssFiles) {
            this.loadFile(window.location.origin + `/assets/css/${css}`, 'css')
        }
        for (let js of this.jsFiles) {
            this.loadFile(window.location.origin + `/assets/js/${js}`, 'js')
        }
    }

    ngAfterViewInit(): void {
        window.onscroll = () => {
            this.stickyheader()
        };


    }
    stickyheader() {
        this.header = document.getElementById("collapsibleNavbar");
        if(this.header != undefined){
            this.sticky = this.header.offsetTop;
        }
        if (this.sticky !== undefined && this.sticky !== null) {
            if (window.pageYOffset > this.sticky) {
                setTimeout(() => {
                    this.header.classList.add("sticky");
                }, 20)
            } else {
                setTimeout(() => {
                    this.header.classList.remove("sticky");
                }, 20);
            }
        }
    }
}
