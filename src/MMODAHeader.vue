<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <header id="navbar" role="banner"
    class="navbar container-fluid navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
                <a class="logo navbar-btn pull-left"
          href="/mmoda/"
          title="Home"> <img class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo.png" alt="Home" />
        </a>
        <a class="logo navbar-btn pull-left" target="_blank"
          href="https://www.unige.ch/sciences/astro/en/"
          title="Departement of Astronomy - university of Geneva"><img  class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo-fac-sciences.png" alt="Departement of Astronomy - university of Geneva" />
        </a>
        <a class="logo navbar-btn pull-left" target="_blank"
          href="https://www.isdc.unige.ch/integral/"
          title="The INTErnational Gamma-Ray Astrophysics Laboratory - INTEGRAL"><img  class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo-isdc.png" alt="The INTErnational Gamma-Ray Astrophysics Laboratory - INTEGRAL" />
        </a>
        <a class="logo navbar-btn pull-left"
          href="https://www.epfl.ch/labs/lastro" target="_blank"
          title="Laboratory of Astrophysics (LASTRO) - EPFL"><img  class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo-epfl.png" alt="Laboratory of Astrophysics (LASTRO) - EPFL" />
        </a>
        <a class="logo navbar-btn pull-left"
          href="https://apc.u-paris.fr/APC_CS/en" target="_blank"
          title="Laboratoire AstroParticule et Cosmologie (APC)"><img  class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo-apc.png" alt="Laboratoire AstroParticule et Cosmologie (APC)" />
        </a>
        <a class="logo navbar-btn pull-left"
          href="https://kau.org.ua/en" target="_blank"
          title="Kyiv Academic University (KAU)"><img  class="img-fluid img-responsive" style="max-height: 60px;"
          src="https://www.astro.unige.ch/mmoda/sites/all/themes/bootstrap_mmoda/logo-kau.png" alt="Kyiv Academic University (KAU)" />
        </a>
        
            </div>
          <div class="mmoda-user-menu btn-group pull-right" role="group">
                      <a
              title="My account"
              data-mmodaclass="ctools-use-modal ctools-modal-modal-popup-large btn btn-default"
              class="btn btn-default" target="_blank"
              href="/mmoda/user"><span class="oda-icon-label">My account </span>
              <span class="glyphicon glyphicon-user"> </span> </a>
          <a
              title="Sign out"
              class="btn btn-default"
              href="/mmoda/user/logout"><span class="oda-icon-label">Sign out </span>
              <span class="glyphicon glyphicon-log-out"></span> </a>
          </div> 

        </div>

  </header>
</template>