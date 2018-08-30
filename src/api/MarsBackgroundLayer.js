/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import 'worldwindjs'; //WorldWind global

/* global WorldWind */

/**
 * A Mars image layer that spans the entire globe.
 */
export default class MarsOneImageLayer extends WorldWind.RenderableLayer {
  constructor(title) {
    super(title || "Mars");
    
    let surfaceImage = new WorldWind.SurfaceImage(WorldWind.Sector.FULL_SPHERE,
      "images/Mars_Viking_MDIM21_ClrMosaic_global_1024.jpg");
    this.addRenderable(surfaceImage);

    this.pickEnabled = false;

    this.minActiveAltitude = 0;
  }
}
