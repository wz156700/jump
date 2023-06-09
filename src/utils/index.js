export default {
  pointInPolygon (point, vs) {
      var x = point[0], y = point[1];
      
      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];
          
          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      
      return inside;
  },

  mapUv (textureWidth, textureHeight, geometry, faceIdx, x1, y1, x2, y2, flag) {
    var tileUvW = 1 / textureWidth;
    var tileUvH = 1 / textureHeight;
    if (geometry.faces[faceIdx] instanceof THREE.Face3) {
      var UVs = geometry.faceVertexUvs[0][faceIdx * 2];
      if (faceIdx == 4 && !flag) {
        UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
        UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
        UVs[1].x = x2 * tileUvW;UVs[1].y = y1 * tileUvH;
      } else {
        UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
        UVs[1].x = x1 * tileUvW;UVs[1].y = y2 * tileUvH;
        UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
      }
      var UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
      if (faceIdx == 4 && !flag) {
        UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
        UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
        UVs[0].x = x2 * tileUvW;UVs[0].y = y1 * tileUvH;
      } else {
        UVs[0].x = x1 * tileUvW;UVs[0].y = y2 * tileUvH;
        UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
        UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
      }
    }
  }
}