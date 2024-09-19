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
      
      <!-- MTM disable site name
            -->

          </div>
        <div class="mmoda-user-menu btn-group pull-right" role="group">
                    <a
            title="My account"
            data-mmodaclass="ctools-use-modal ctools-modal-modal-popup-large btn btn-default"
            class="btn btn-default" target="_blank"
            href="/mmoda/user"><span class="oda-icon-label">My account </span>
            <span class="glyphicon glyphicon-user"> </span> </a>
          <!--
            <a
            title="My account"
            class="ctools-use-modal ctools-modal-modal-popup-large btn btn-default open-in-modal" href="modal_forms/nojs/user/96/change-password"><span
            class="oda-icon-label">Change password</span><span
            class="glyphicon glyphicon-lock"> </span> </a>
            -->
         <a
            title="Sign out"
            class="btn btn-default"
            href="/mmoda/user/logout"><span class="oda-icon-label">Sign out </span>
            <span class="glyphicon glyphicon-log-out"></span> </a>
        </div> 

      </div>
</header>

<div class="container container-fluid justify-content-center align-items-center">
<form class="row g-3">
  <div class="col-md-12">
    <label for="object_name" class="form-label">Object name *</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="col-md-12">
    <button
      class="btn btn-secondary p-1"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Resolve
    </button>
    <button
      class="btn btn-secondary p-1"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Explore
    </button>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">RA</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="col-md-6">
    <label for="inputState" class="form-label">Dec</label>
    <input type="text" class="form-control" id="inputState">
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">Start Time</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">End Time</label>
    <input type="text" class="form-control" id="inputState">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Time Unit</label>
      <select id="inputState" class="form-select">
        <option selected>ISOT</option>
        <option>MJD</option>
      </select>  </div>
  <div class="col-12">
    <!-- <button type="submit" class="btn btn-primary"></button> -->
  </div>
</form>
</div>
<!-- 




  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">RA</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
    <label for="exampleInputPassword2" class="form-label">Dec</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>


  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>

</div> -->


<!-- <button 
  class="btn btn-primary" 
  data-bs-target="#collapseTarget" 
  data-bs-toggle="collapse">
  Bootstrap collapse
</button> -->

<!-- <div class="collapse py-2" id="collapseTarget">
  This is the toggle-able content!
</div>

  <div class="dropdown">
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div> -->

</template>


<script>

</script>